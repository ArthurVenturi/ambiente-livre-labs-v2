---
kind: plugin
title: SuiteCRM Integration
publisher: Ambiente Livre Labs
license: Apache-2.0
description: Integration starter for connecting SuiteCRM with enterprise services, synchronizing customer records and automating CRM workflows.
initials: SC
categories:
  - CRM
type: Integration
openSource: true
featured: true
install:
  packageManager: Docker Compose
  command: docker compose up -d suitecrm
  requirements:
    - Docker Engine 24 or newer
    - A SuiteCRM instance with API access
---

# SuiteCRM Integration

Connect SuiteCRM with enterprise services and automate CRM workflows.
