# The History

### Bare Metal

Historically, if you ever wanted to run a web server, you either needed to set your own server or rent a server somewhere. We call this “bare metal” because, well, your code is executing on the processor of the server with no additional layers of abstraction. This is still a good option if you’re extremely performance sensitive and have skills to manage and take care of your server.

You need to be extremely careful and skilled to manage your server. You need to be a true sysadmin to be able to do this.

![xkcd](/images/xkcd.png)

The problem with this is that you become extremely inflexible to scale.

What if you need to spin up a additional server?

Okay, you can just setup another server? Now, you have a pool of servers responding to traffic.

What about keeping the Operating system up to date? What about other software like packages and drivers? What about patching bugs? Updates?

You see the problem now.

### Virtual Machines

This is the next step. This is adding a layer of abstraction between you and the bare metal. Now instead of running one instance of a operating system on your server, you will be running multiple instances of os inside a host instance.

Now I can have one powerful server and have multiple VMs running inside it at will. If I am adding a new service, I can just spin up a new VM. If one service fails, it does not affect other services. There is a lot of flexibility here. 

Also, there is a aspect of security here, you are only responsible for handling your own VM. 

Each VM is completely isolated. Suppose, the other guy who is running a VM tries to be malicios and run a fork bomb to devour all the resources? if this were bare metal, it would have crashed the whole server, but this time only the virtual machine running the fork bomb gets affected.

All of these features comes at the cost of a bit of performance. Running a host operating system (which is often called a hypervisor) isn’t free. But this is very neligibele, to the point that this does not concern anyone.

This is was the standard of hosting services on the internet. There are many public cloud providers who allow you to run VMs. You will just have to choose how much computing power you need and select a OS.

The problem with running VMs is that you will still have to manage the virtual machine, all the software, networking, updates, security, etc. You are also still paying the cost of running a whole operating system.

It would be nice if there is just a way to run code in a isolated solution inside the host OS without the added expenditure of the guest (VM) OSs.

### Containers

Now enter containers, these allows you to run services in completely isolated environments directly without setting separate operating systems.

## Containers

A container is a **lightweight, standalone package** of software that includes everything needed to run an application. It ensures that software runs the same way, regardless of where it is deployed.

When you peel back the marketing layers of "Docker" and "Kubernetes," you realize that a "container" isn't actually a real thing in the way a file or a folder is.

If you look at the source code of the Linux kernel, you won’t find a single object called a "container." Instead, what we call a container is just a **regular process** that has been put into a "suit of armor" (jail) using three specific Linux features:

1. Namespaces
2. cgroups
3. chroot

A container is just a lonely, restricted process.

The reason people got so excited about it wasn't because the technology was new (these features have been in Linux for a long time), but because tools like Docker made the "duct-taping" process so easy that you could do it with a single command instead of writing complex kernel-level configurations.
