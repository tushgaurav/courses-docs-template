# CHROOT

chroot stands for “change root”.

In Linux, everything starts at the **root** directory. From that root, you can see everything: `/bin`, `/etc`, `/home`, `/var`, etc.

![Linux File System](/images/root.png)

It's a Linux command that allows you to set the root directory of a new process. 

Imagine you have a folder on your computer at `/my_secret_box`.

If you run the `chroot` command on a process and point it to that folder, you are telling that process: 

**"Everything outside of this folder no longer exists. This folder is now `/` "**

The process can not go up one level to see the files that exist outside.

In our container use case, we can just set the root directory to be what-ever the new container’s new root directory should be and the new container’s group of processes can’t see anything outside of it.

Let’s try it.

We will be doing this in a Ubuntu machine. However you can do this in any linux distribution of your choice (yes arch works). For me, as I am running macOS, I will be doing this in a docker container (ahh, yes the irony). I will be running a docker container:

```bash
docker run -it --name ubuntu-host --rum --previleged ubuntu:jammy
```

This will download the official Ubuntu container from Docker Hub and grab the version which is tagged with “jammy” tag.

`docker run` means we are running some commands inside the container and -it means interactive shell, so that we could use it like a normal terminal.

If you are using Windows you can skip this step and directly use Ubuntu inside WSL (Windows Subsystem for Linux).

Let’s check the version of Ubuntu we are using:

```bash
cat /etc/issue
```

Okay, everything is perfect. 

Now lets try to use chroot now.

1. Make a new folder in the root directory using `mkdir /tushar-new-root` , this is going to be our new root.
2. Inside that folder let’s create a text file with some secret, run `echo "orangewood makes robotics fun" >> /tushar-new-root/secret.txt` .
3. Now lets try to run `chroot /tushar-new-root bash` and see what happens.

You will see something about failing to find bash.

This is actually a expected behaviour. bash is a program and our new root does not have any bash binary to run, remember it can’t reach outside of its new root!

Let’s fix this, run:

1. `mkdir /tushar-new-root/bin`
2. `cp /bin/bash /bin/ls /tushar-new-root/bin/`
3. `chroot /tushar-new-root bash`

It will still fail because these binary requires libraries to run them and we did’nt have these libraries in our new root.

Let’s do that too.

Run `ldd /bin/bash` This will print something like this:

```bash
ldd /bin/bash
    linux-vdso.so.1 (0x0000ffffbe221000)
    libtinfo.so.6 => /lib/aarch64-linux-gnu/libtinfo.so.6 (0x0000ffffbe020000)
    libc.so.6 => /lib/aarch64-linux-gnu/libc.so.6 (0x0000ffffbde70000)
    /lib/ld-linux-aarch64.so.1 (0x0000ffffbe1e8000)
```

These are the libraries we need for bash. Let’s go ahead and copy these into our new root.

1. mkdir `/tushar-new-root/lib`
2. Then we copy each of the libraries one by one.
    1. `cp /lib/aarch64-linux-gnu/libtinfo.so.6 /lib/aarch64-linux-gnu/libc.so.6 /lib/ld-linux-aarch64.so.1 /tushar-new-root/lib`
3. Let’s do it again for ls. Run `ldd /bin/ls`
4. Follow the same process and copy the libraries required for ls into our new root.
    1. `cp /lib/aarch64-linux-gnu/libselinux.so.1 /lib/aarch64-linux-gnu/libc.so.6 /lib/ld-linux-aarch64.so.1 /lib/aarch64-linux-gnu/libpcre2-8.so.0 /tushar-new-root/lib`

Now, finally, run `chroot /my-new-root bash` and run `ls`.

You will see everything inside the directory.

Now, let’s run `pwd` to see the working directory. You should see /

You can’t get out of here!
