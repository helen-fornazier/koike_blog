---
title: "Introduction to Virtme-ng: cross-architecture and kselftests"
date: 2026-04-13
tags: ["igalia", "linux-kernel"]
archives: ["2026"]
description: "Virtme is a handy tool for Linux kernel development. If you are not familiar with it yet, check this post."
draft: true
image: "/images/virtme-ng-boot.png"
---

If you are a Linux kernel developer, you have probably heard about [virtme](https://web.git.kernel.org/pub/scm/utils/kernel/virtme/virtme.git), originally written by Andy Lutomirski.

Virtme boots your compiled Linux kernel in QEMU while reusing your host root filesystem, which makes kernel testing much easier.

Now, meet [virtme-ng](https://github.com/arighi/virtme-ng), written by Andrea Righi and based on the original virtme, with several improvements. Virtme-ng can configure and compile the kernel, generate a rootfs, and run the guest for different architectures. The full workflow is optimized to get you up and running quickly.

# Trying it out: Native

### Install on Ubuntu/Debian

```
sudo apt install virtme-ng
git clone git://git.kernel.org/pub/scm/linux/kernel/git/torvalds/linux.git
cd linux
```

### Build

To build the kernel, you can simply do:

```
vng O=.virtme/build --build
```

No need to create the `.virtme/build` folder; `vng` creates it for you.

### Execute

Then just run:

```
vng O=.virtme/build --verbose
```

And you should see a shell running your kernel:

```
[    2.099301] virtme-ng-init: initialization done
          _      _
   __   _(_)_ __| |_ _ __ ___   ___       _ __   __ _
   \ \ / / |  __| __|  _   _ \ / _ \_____|  _ \ / _  |
    \ V /| | |  | |_| | | | | |  __/_____| | | | (_| |
     \_/ |_|_|   \__|_| |_| |_|\___|     |_| |_|\__  |
                                                |___/
   kernel version: 6.6.76-virtme x86_64
   (CTRL+d to exit)

(base) koike@virtme-ng:~/ig/kernel$
```

# Trying it out: Cross-architecture

Install QEMU and the toolchain for the architecture you are interested in:

```
sudo apt install qemu-system-arm
sudo apt install gcc-aarch64-linux-gnu
```

### Build

Just add `--arch=ARCH` to the build command:

```
vng O=.virtme/build_arm64 --verbose --build --arch=arm64
```

### Rootfs + Execute

You can pass an existing rootfs to virtme-ng, or pass an empty directory and let it create one for you:

```
vng O=.virtme/build_arm64 --verbose --arch=arm64 --root=.virtme/rootfs_arm --user root
```

In this example, virtme-ng downloads the rootfs from the latest [Ubuntu Cloud Image](https://cloud-images.ubuntu.com/).

You should then get a shell in an emulated environment for your target architecture:

```
          _      _
   __   _(_)_ __| |_ _ __ ___   ___       _ __   __ _
   \ \ / / |  __| __|  _   _ \ / _ \_____|  _ \ / _  |
    \ V /| | |  | |_| | | | | |  __/_____| | | | (_| |
     \_/ |_|_|   \__|_| |_| |_|\___|     |_| |_|\__  |
                                                |___/
   kernel version: 6.6.76-virtme aarch64
   (CTRL+d to exit)

root@virtme-ng:/#
```

# Executing kselftests with virtme-ng

The Linux kernel source tree includes a self-test framework called kselftests.

For instance, the `bpf` subsystem typically requires booting into the target kernel to build and run its tests.

Virtme-ng fits this workflow well: you boot your freshly built kernel and can still reuse your usual userspace toolchain from the host.

To persist build outputs, use `--rwdir .`, so virtme-ng can write to your current host directory.

```
# vng --build
# vng --rwdir .
          _      _
   __   _(_)_ __| |_ _ __ ___   ___       _ __   __ _
   \ \ / / |  __| __|  _   _ \ / _ \_____|  _ \ / _  |
    \ V /| | |  | |_| | | | | |  __/_____| | | | (_| |
     \_/ |_|_|   \__|_| |_| |_|\___|     |_| |_|\__  |
                                                |___/
   kernel version: 7.0.0-rc5-virtme x86_64
   (CTRL+d to exit)

[root@virtme-ng linux-bpf-selftest]# cd tools/testing/selftests/bpf
[root@virtme-ng bpf]# make
  GEN     /var/home/koike/ig/linux-bpf-selftest/tools/testing/selftests/bpf/tools/build/libbpf/bpf_helper_defs.h
  CC      /var/home/koike/ig/linux-bpf-selftest/tools/testing/selftests/bpf/tools/build/libbpf/staticobjs/libbpf.o
  CC      /var/home/koike/ig/linux-bpf-selftest/tools/testing/selftests/bpf/tools/build/libbpf/staticobjs/bpf.o
...
[root@virtme-ng bpf]# ./test_progs -t verifier_bounds
...
#1/107   verifier_bounds/bound check with JMP_JLT for crossing 64-bit signed boundary:OK
#1/108   verifier_bounds/bound check with JMP_JSLT for crossing 64-bit signed boundary:OK
#1/109   verifier_bounds/bound check for loop upper bound greater than U32_MAX:OK
#1/110   verifier_bounds/bound check with JMP32_JLT for crossing 32-bit signed boundary:OK
#1/111   verifier_bounds/bound check with JMP32_JSLT for crossing 32-bit signed boundary:OK
#1       verifier_bounds:OK (SKIP: 28/111)
Summary: 1/83 PASSED, 28 SKIPPED, 0 FAILED
```


# What to check next

Virtme-ng has several other features, such as remote builds and debugging support. For more information, check the project page: https://github.com/arighi/virtme-ng
