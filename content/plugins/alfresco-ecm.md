---
title: Alfresco ECM Extensions
categories:
  - ECM
description: Reusable extensions for Alfresco Content Services, including document lifecycle integration, metadata handling and enterprise content workflows.
featured: true
initials: AL
install:
  packageManager: npm
  command: npm install @ambientelivre/alfresco-ecm
  requirements:
    - Node.js 20 or newer
    - Alfresco Content Services 7 or newer
kind: plugin
license: Apache-2.0
openSource: true
publisher: Ambiente Livre Labs
type: Extension
verified: true
keywords: 
  - Autentication
github:
  stars: 98
  license: Apache-2.0
  contributorCount: 1
  downloadUrl: https://github.com/ambientelivre/alfresco-ecm
  createdAt: 2024-11-20T10:12:00Z
  updatedAt: 2026-10-28T14:03:11Z
  htmlUrl: https://github.com/ambientelivre/alfresco-ecm
  owner:
    login: ambientelivre
    avatarUrl: https://avatars.githubusercontent.com/u/12345?v=4
  release:
    tag: v1.2.1
    publishedAt: 2026-02-10T09:00:00Z
    url: https://github.com/ambientelivre/alfresco-ecm/releases/tag/v1.2.1
  contributors:
    - login: miguel
      avatarUrl: https://avatars.githubusercontent.com/u/97977665?v=4
      url: https://github.com/miguel
---

Extend document lifecycle and metadata workflows in Alfresco Content Services.

## Overview

Alfresco ECM Extensions is a set of reusable modules that plug into reflex into all Alfresco Content Services and cover the most common enterprise content scenarios.

### Features

- Document lifecycle hooks (create, update, archive, delete)
- Metadata mapping and validation
- Configurable approval workflows
- REST endpoints for external integrations

### Use cases

| Scenario            | What the plugin does                     |
| ------------------- | ---------------------------------------- |
| Contract management | Tracks status and expiry metadata        |
| Compliance          | Enforces retention and archive rules     |
| Integrations        | Exposes document events to other systems |

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

2026-02-10

- Fixed metadata validation for nullable fields
- Updated dependencies

### v1.2.0

2025-11-03

- Added approval workflow support
- Added REST endpoints for document events

### v1.0.0

2024-11-20

- Initial release