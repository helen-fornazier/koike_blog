---
title: "Introduction to V4L2 in the Linux kernel"
date: 2026-02-15
tags: ["linux-kernel"]
archives: ["2026"]
description: "An overview of the Video4Linux2 (V4L2) subsystem and how camera drivers are structured in the kernel."
draft: true
---

NOTE: this is a test post, not a real post.

The Video4Linux2 (V4L2) subsystem is the Linux kernel framework responsible for video capture, output, and codec devices. It provides a unified API for userspace applications to interact with cameras, TV tuners, and other video hardware.

## Key concepts

- **Device nodes** — V4L2 exposes `/dev/videoN` nodes for video capture/output and `/dev/mediaN` for media controller topology.
- **Media controller** — Describes the pipeline of hardware blocks (sensors, ISPs, bridges) and their connections.
- **Subdevices** — Individual hardware blocks (e.g. image sensors) are represented as V4L2 subdevices.

## Writing a simple V4L2 driver

A minimal platform camera driver registers itself with the V4L2 framework and implements a set of ops:

```c
static const struct v4l2_subdev_ops my_sensor_ops = {
    .core  = &my_sensor_core_ops,
    .video = &my_sensor_video_ops,
    .pad   = &my_sensor_pad_ops,
};
```

More on this in future posts!
