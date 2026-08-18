---
title: "Notes on MAVLink v1 Authentication and Passive Monitoring"
date: 2026-03-20
description: "A short note on the trust problem in unsigned MAVLink v1 traffic and the role of passive monitoring."
tags:
  - uav
  - research
  - notes
---

MAVLink carries telemetry and commands between an unmanned vehicle and its ground-control software. Position, battery state, mode changes, and control messages all move through the same protocol.

MAVLink v1 was designed to be small and reliable. It does not provide message authentication. A receiver therefore has no protocol-level proof that a command came from the operator it trusts.

## The trust problem

On a network where another device can inject MAVLink v1 traffic, the vehicle may receive commands from a source it cannot authenticate. The protocol alone cannot distinguish an expected sender from an unexpected one.

That makes several behaviours worth monitoring:

- commands arriving from a previously unseen system identifier;
- disarm requests while the vehicle is airborne;
- command rates that change abruptly;
- repeated sequence numbers;
- position updates that imply implausible movement;
- unexpected parameter changes.

These signals are not proof of an attack by themselves. They are observations that need context and careful thresholds.

## Passive monitoring

SENTINEL listens to MAVLink traffic without transmitting back onto the network. It establishes a short baseline and applies rule-based checks to later messages.

The passive approach keeps the monitor outside the control path. Its job is to record and surface suspicious behaviour, not to take control of the vehicle.

The current implementation and its limitations are documented in the [SENTINEL repository](https://github.com/sumitguptaaa/SENTINEL).

## Next steps

The useful work is in testing these rules against varied normal traffic, measuring false positives, and documenting where rule-based detection stops being reliable. Future notes will focus on those boundaries rather than treating an alert as a conclusion.
