# Namespaces

While chroot is very simple to understand, namespaces and cgroups are a bit more difficult to grasp.

### The problem with chroot

chroot only protects our file system.

1. chroot in a terminal.
2. In another terminal run `docker exec -it ubuntu-host bash`. This will get another terminal session #2 for us.
3. Run `tail -f /my-new-root/secret.txt &` in #2. This will start an infinitely running process in the background.
4. Run `ps` to see the process list in #2 and see the `tail` process running. Copy the PID (process ID) for the tail process.
5. In #1, the chroot'd shell, run `kill <PID you just copied>`. This will kill the tail process from inside the `chroot'd` environment. This is a problem because that means chroot isn't enough to isolate someone. We need more barriers. This is just one problem, processes, but it's illustrative that we need more isolation beyond just the file system.

### namespaces enter the picture

Now, let’s create a chroot’d environment that’s also isolated using namespaces. We will be using `unshare` command here.

`unshare` creates a new isolated namespace from its parent.

```bash
 # Install debootstrap
apt-get update -y
apt-get install debootstrap -y
debootstrap --variant=minbase jammy /better-root

 # head into the new namespace'd, chroot'd environment
unshare --mount --uts --ipc --net --pid --fork --user --map-root-user chroot /better-root bash # this also chroot's for us
mount -t proc none /proc # process namespace
mount -t sysfs none /sys # filesystem
mount -t tmpfs none /tmp # filesystem
```

This will create a new isolated system with its own PIDs, mounts and network stack. Now we can’t see any of the processes outside of this root.

Let’s try the previous exercise again:

1. Run `tail -f /my-new-root/secret.txt &` from #2
2. Run `ps` from #1, grab pid for `tail`
3. Run `kill <pid for tail>`, see that it doesn't work

We used namespaces to protect our processes!
