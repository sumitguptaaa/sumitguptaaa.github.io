---
title: "When a Valid MAVLink Packet Still Cannot Prove Who Sent It"
date: 2026-03-20
description: "A guided reconstruction of the trust gap in MAVLink v1 and what passive monitoring can—and cannot—tell us."
autopsy: "001"
evidence: mavlink-v1
tags:
  - mavlink
  - protocol-security
  - monitoring
---

MAVLink carries telemetry and commands between an unmanned vehicle and the systems around it. A small frame can report position, change a mode, update a parameter, or request an action.

The important question is not only whether a frame is valid. It is whether the receiver can prove who created it.

## The simple version

Imagine receiving a sealed envelope with a return address written on the front. The envelope is intact. The contents follow the expected format. The return address looks familiar.

None of those facts prove that the person named on the envelope actually sent it.

MAVLink v1 has a similar boundary. Its frame contains system and component identifiers, but it does not contain a cryptographic signature. The identifiers describe the claimed source; they do not authenticate it.

## What the checksum proves

The final two bytes of a MAVLink v1 frame contain a checksum. The receiver uses it to detect accidental corruption and to confirm that both sides understand the same message definition.

That is useful, but it answers a different question:

> Did this packet arrive in a form that matches the protocol?

It does not answer:

> Did this packet come from a sender I trust?

The official [MAVLink packet serialization guide](https://mavlink.io/en/guide/serialization.html) documents the v1 fields and shows that the frame ends at the checksum. The optional signature field belongs to MAVLink 2.

## Where trust fractures

If another device can place traffic onto the same communication path, it can construct a frame containing a plausible system identifier and a correct checksum. The protocol-level checks may accept the frame as structurally valid even though MAVLink v1 provides no signature proving the sender's identity.

This observation does not mean every MAVLink network is immediately compromised. Access controls, radio configuration, network isolation, and the surrounding implementation still matter. It means the v1 frame alone cannot settle the identity question.

## What passive monitoring contributes

[SENTINEL](https://github.com/sumitguptaaa/SENTINEL) listens without transmitting back onto the network. It builds a short baseline and watches later traffic for behavior that deserves attention, including:

- a system identifier that was not present during the baseline;
- duplicate sequence numbers;
- command rates that change sharply;
- unexpected state-changing commands;
- position reports that imply implausible movement;
- parameter changes from an unexpected source.

These are signals, not verdicts. A duplicate sequence number may have an ordinary explanation. A new system identifier may be legitimate. The monitor can preserve context and focus an investigation, but it cannot create the authentication missing from the protocol.

## What the evidence establishes

The bounded conclusion is simple:

1. MAVLink v1 frames contain source identifiers and a checksum.
2. They do not contain the signature field available in MAVLink 2.
3. A valid v1 checksum supports frame integrity, not sender identity.
4. Passive rules can identify suspicious patterns, but they require testing against varied normal traffic.

MAVLink 2 adds packet signing so systems can verify that messages originate from a holder of the shared signing key. The [official MAVLink 2 guide](https://mavlink.io/en/guide/mavlink_2.html) describes signing as an authentication feature.

## Residual signal

**A packet can be valid without its sender being verified.**

That distinction—between integrity and identity—is the part worth carrying into every protocol investigation.
