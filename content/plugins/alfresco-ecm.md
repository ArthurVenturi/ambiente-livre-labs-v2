---
kind: plugin
title: Alfresco ECM Extensions
publisher: Ambiente Livre Labs
license: Apache-2.0
description: Reusable extensions for Alfresco Content Services, including document lifecycle integration, metadata handling and enterprise content workflows.
initials: AL
categories:
  - ECM
type: Extension
openSource: true
verified: true
featured: true
install:
  packageManager: npm
  command: npm install @ambientelivre/alfresco-ecm
  requirements:
    - Node.js 20 or newer
    - Alfresco Content Services 7 or newer
---

Extend document lifecycle and metadata workflows in Alfresco Content Services.

## Overview

Alfresco ECM Extensions is a set of reusable modules that plug into Alfresco Content Services and cover the most common enterprise content scenarios.

### Features

- Document lifecycle hooks (create, update, archive, delete)
- Metadata mapping and validation
- Configurable approval workflows
- REST endpoints for external integrations

### Use cases

| Scenario | What the plugin does |
| --- | --- |
| Contract management | Tracks status and expiry metadata |
| Compliance | Enforces retention and archive rules |
| Integrations | Exposes document events to other systems |

> This plugin is open source and maintained by Ambiente Livre Labs.

## Installation

### Requirements

- Node.js 20 or newer
- Alfresco Content Services 7 or newer

### Install the package

```bash
npm install @ambientelivre/alfresco-ecm
```

### Register the module

```ts
import { AlfrescoEcm } from '@ambientelivre/alfresco-ecm'

export default defineConfig({
  modules: [
    AlfrescoEcm({
      baseUrl: 'https://alfresco.example.com',
      lifecycle: true,
    }),
  ],
})
```

## Changelog

### v1.2.1

- Fixed metadata validation for nullable fields
- Updated dependencies

### v1.2.0

- Added approval workflow support
- Added REST endpoints for document events

### v1.0.0

- Initial release