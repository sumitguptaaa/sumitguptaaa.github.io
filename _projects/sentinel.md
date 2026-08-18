---
title: SENTINEL
description: Passive monitoring and rule-based detection for MAVLink communication streams.
repository: https://github.com/sumitguptaaa/SENTINEL
status: active
featured: true
order: 1
---

## Problem

MAVLink v1 does not provide message authentication. A receiver cannot use the protocol alone to prove that a command came from an expected operator.

## Implementation

SENTINEL is a Python project that listens to MAVLink traffic without transmitting onto the network. Its capture and rules components look for six categories of behaviour, including unknown senders, command flooding, repeated sequence numbers, and unexpected state changes.

The repository contains the implementation, tests, setup instructions, and current research notes.

## Limits

The project documentation describes evaluation against ArduPilot SITL. That is a controlled simulation environment, not evidence of production deployment. Detection rules still need broader normal-traffic testing and careful false-positive analysis.

## Repository

[github.com/sumitguptaaa/SENTINEL](https://github.com/sumitguptaaa/SENTINEL)
