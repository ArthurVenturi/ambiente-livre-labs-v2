---
kind: plugin
title: OpenTofu Infrastructure Templates
publisher: Ambiente Livre Labs
license: Apache-2.0
description: Infrastructure-as-code templates for provisioning and managing reproducible environments using reusable OpenTofu configurations.
initials: OT
categories:
  - IAC
  - DevOps
type: Template
openSource: true
featured: false
install:
  packageManager: OpenTofu
  command: tofu init && tofu apply
  requirements:
    - OpenTofu 1.8 or newer
    - Cloud credentials configured in the environment
---

# OpenTofu Infrastructure Templates

Provision reproducible environments with reusable OpenTofu configurations.
