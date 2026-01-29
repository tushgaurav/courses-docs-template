# cgroups

Well now we have hidden the processes from each environments. We’re all good right?

Not quite. But we are almost there.

Suppose, it’s Prime Day sale and Rohit and Manan are ready for it. Everything is supposed to go and at 9:00AM their site suddenly goes down.

What happened?

They log into their chroot’d, unshare’d shell on your server and see that the CPU is stuck at 100% and there’s no more memory available to allocate.

What happened?

One explanation is that Rohit’s site was running on a container and he simply logged into that environment and run a malicious script that ate up all resources. Now, Manan’s site goes down increasing Rohit’s sales.

We have a problem.

Every isolated environment has access to all *physical* resources of the server. There's no isolation of physical components from these environments.

Enter cgroups, or control groups.

Google saw this same problem when building their own infrastructure and wanted to protect runaway processes from taking down entire servers and made this idea of cgroups, so you can say "this isolated environment only gets so much CPU, so much memory, etc. and once it's out of those it's out-of-luck, it won't get any more.”

This is a bit more difficult to accomplish but let's go ahead and give it a shot.

cgroups, as we have said, allow you to move processes and their children into groups which then allow you to limit various aspects of them. Imagine you're running a single physical server for Google with both Maps and GMail having virtual servers on it. If Maps ships an infinite loop bug and it pins the CPU usage of the server to 100%, you only want Maps to go down and *not* GMail just because it happens to be colocated with Maps. Let's see how to do that.

You interact with cgroups by a pseudo-file system. Honestly, the whole interface feels weird to me but that is what it is! Inside your #2 terminal (the non-unshared one) run `cd /sys/fs/cgroup` and then run `ls`. You'll see a bunch of "files" that look like `cpu.max`, `cgroup.procs`, and `memory.high`. Each one of these represents a setting that you can play with with regard to the cgroup. In this case, we are looking at the root cgroup: all cgroups will be children of this root cgroup. The way you make your own cgroup is by creating a folder inside of the cgroup.

```bash
# creates the cgroup
mkdir /sys/fs/cgroup/sandbox

# look at all the files created automatically
ls /sys/fs/cgroup/sandbox
```

We now have a sandbox cgroup, which is a child of the root cgroup and can put limits on it!

```bash
# Find your isolated bash PID, it's the bash one immediately after the unshare
ps aux

# should see the process in the root cgroup
cat /sys/fs/cgroup/cgroup.procs

# puts the unshared env into the cgroup called sandbox
echo <PID> > /sys/fs/cgroup/sandbox/cgroup.procs

# should see the process in the sandbox cgroup
cat /sys/fs/cgroup/sandbox/cgroup.procs

# should see the process no longer in the root cgroup - processes belong to exactly 1 cgroup
cat /sys/fs/cgroup/cgroup.proc
```

We now have moved our unshared bash process into a cgroup. We haven't placed any limits on it yet but it's there, ready to be managed.

```bash
# should see all the available controllers
cat /sys/fs/cgroup/cgroup.controllers

# there's no controllers
cat /sys/fs/cgroup/sandbox/cgroup.controllers

# there's no controllers enabled its children
cat /sys/fs/cgroup/cgroup.subtree_control
```

You have to enable controllers for the children and none of them are enabled at the moment. You can see the root cgroup has them all enabled, but hasn't enabled them in its subtree_control so thus none are available in sandbox's controllers. 

Easy, right? We just add them to subtree_control, right? Yes, but one problem: you can't add new subtree_control configs while the cgroup itself has processes in it. So we're going to create another cgroup, add the rest of the processes to that one, and then enable the subtree_control configs for the root cgroup.

```bash
# make new cgroup for the rest of the processes, you can't modify cgroups that have processes and by default Docker doesn't include any subtree_controllers
mkdir /sys/fs/cgroup/other-procs

# see all the processes you need to move, rerun each time after you add as it may move multiple processes at once due to some being parent / child
cat /sys/fs/cgroup/cgroup.procs

# you have to do this one at a time for each process
echo <PID> > /sys/fs/cgroup/other-procs/cgroup.procs

# verify all the processes have been moved
cat /sys/fs/cgroup/cgroup.procs

# add the controllers
echo "+cpuset +cpu +io +memory +hugetlb +pids +rdma" > /sys/fs/cgroup/cgroup.subtree_control

# notice how few files there are
ls /sys/fs/cgroup/sandbox

# all the controllers now available
cat /sys/fs/cgroup/sandbox/cgroup.controllers

# notice how many more files there are now
ls /sys/fs/cgroup/sandbox
```

We did it! We went ahead and added all the possible controllers, but normally you should add just the ones you need. If you want to learn more about what each of them does, [the kernel docs are quite readable](https://docs.kernel.org/admin-guide/cgroup-v2.html#controllers).

Let’s now open a third terminal. We will use this to monitor resource usage using `htop`

Run `docker exec -it docker-host bash`

```bash
# a cool visual representation of CPU and RAM being used
apt-get install htop

# from #3 so we can watch what's happening
htop

# run this from #1 terminal and watch it in htop to see it consume about a gig of RAM and 100% of CPU core
yes | tr \\n x | head -c 1048576000 | grep n

# from #2, (you can get the PID from htop) to stop the CPU from being pegged and memory from being consumed
kill -9 <PID of yes>

# should see max, so the memory is unlimited
cat /sys/fs/cgroup/sandbox/memory.max

# set the limit to 80MB of RAM (the number is 80MB in bytes)
echo 83886080 > /sys/fs/cgroup/sandbox/memory.max

# from inside #1, see it limit the RAM taken up; because the RAM is limited, the CPU usage is limited
yes | tr \\n x | head -c 1048576000 | grep n
```

We just made it so our unshared environment only has access to 80MB of RAM, so despite a script being run to literally just consume RAM, it was limited to only consuming 80MB of it.

And now we can call this a container. You have handcrafted a container. A container is literally nothing more than what we did together. There are other sorts of technologies that will accompany containers, like runtimes and daeomons, but the containers themselves are just a combination of chroot, namespaces, and cgroups! Using these features together, we allow Bob, Alice, and Eve to run whatever code they want and the only people they can mess with is themselves.

So while this is a container at its most basic sense, we haven't broached more advance topics like networking, deploying, bundling, or anything else that something like Docker takes care of for us. But now you know at its most base level what a container is, what it does, and how you *could* do this yourself, but you'll be grateful that Docker does it for you. On to the next lesson!
