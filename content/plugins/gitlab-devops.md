---
kind: plugin
title: GitLab DevOps Templates
publisher: Ambiente Livre Labs
license: Apache-2.0
description: Reusable CI/CD pipeline templates and automation patterns for building, testing and deploying applications with GitLab.
initials: GL
categories:
  - DevOps
type: Template
openSource: true
featured: true
install:
  packageManager: GitLab CI
  command: curl -fsSL https://labs.ambientelivre.com/gitlab-devops/install.sh | sh
  requirements:
    - A GitLab project with CI enabled
    - Runner access with Docker support
---

# GitLab DevOps Templates

Reusable CI/CD pipelines for GitLab application delivery.
