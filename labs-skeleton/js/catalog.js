
const plugins = [
  {
    id: "suitecrm-integration",
    title: "SuiteCRM Integration",
    publisher: "Ambiente Livre Labs",
    description:
      "Integration starter for connecting SuiteCRM with enterprise services, synchronizing customer records and automating CRM workflows.",
    logo: "https://cdn.simpleicons.org/suitecrm",
    initials: "SC",
    categories: ["CRM"],
    type: "Integration",
    openSource: true,
    featured: true,
    url: "#suitecrm-integration"
  },
  {
    id: "wordpress-toolkit",
    title: "WordPress Toolkit",
    publisher: "Ambiente Livre Labs",
    description:
      "Reusable components and integration utilities for extending WordPress installations and connecting content to other business systems.",
    logo: "https://cdn.simpleicons.org/wordpress",
    initials: "WP",
    categories: ["CMS"],
    type: "Starter",
    openSource: true,
    featured: true,
    url: "#wordpress-toolkit"
  },
  {
    id: "glpi-connector",
    title: "GLPI Service Connector",
    publisher: "Ambiente Livre Labs",
    description:
      "A starter integration for connecting GLPI service management workflows with monitoring tools, inventory systems and business applications.",
    logo: "https://cdn.simpleicons.org/glpi",
    initials: "GL",
    categories: ["ITSM", "DevOps"],
    type: "Integration",
    openSource: true,
    featured: false,
    url: "#glpi-connector"
  },
  {
    id: "alfresco-ecm",
    title: "Alfresco ECM Extensions",
    publisher: "Ambiente Livre Labs",
    description:
      "Reusable extensions for Alfresco Content Services, including document lifecycle integration, metadata handling and enterprise content workflows.",
    logo: "https://cdn.simpleicons.org/alfresco",
    initials: "AL",
    categories: ["ECM"],
    type: "Extension",
    openSource: true,
    featured: true,
    url: "#alfresco-ecm"
  },
  {
    id: "camunda-workflows",
    title: "Camunda Workflow Starter",
    publisher: "Ambiente Livre Labs",
    description:
      "A workflow starter for orchestrating business processes with BPMN models, task automation and integrations with external services.",
    logo: "https://cdn.simpleicons.org/camunda",
    initials: "CA",
    categories: ["BPMN"],
    type: "Starter",
    openSource: true,
    featured: false,
    url: "#camunda-workflows"
  },
  {
    id: "gitlab-devops",
    title: "GitLab DevOps Templates",
    publisher: "Ambiente Livre Labs",
    description:
      "Reusable CI/CD pipeline templates and automation patterns for building, testing and deploying applications with GitLab.",
    logo: "https://cdn.simpleicons.org/gitlab",
    initials: "GL",
    categories: ["DevOps"],
    type: "Template",
    openSource: true,
    featured: true,
    url: "#gitlab-devops"
  },
  {
    id: "opentofu-iac",
    title: "OpenTofu Infrastructure Templates",
    publisher: "Ambiente Livre Labs",
    description:
      "Infrastructure-as-code templates for provisioning and managing reproducible environments using reusable OpenTofu configurations.",
    logo: "https://cdn.simpleicons.org/opentofu",
    initials: "OT",
    categories: ["IAC", "DevOps"],
    type: "Template",
    openSource: true,
    featured: false,
    url: "#opentofu-iac"
  }
];

const categoryIcons = {
  CRM: "groups",
  CMS: "article",
  ITSM: "support_agent",
  ECM: "folder_managed",
  BPMN: "account_tree",
  DevOps: "terminal",
  IAC: "cloud"
};

const pluginGrid = document.getElementById("pluginGrid");
const pluginTemplate = document.getElementById("pluginCardTemplate");

function createPluginCard(plugin) {
  const fragment = pluginTemplate.content.cloneNode(true);
  const card = fragment.querySelector(".plugin-card");
  const logo = fragment.querySelector(".plugin-card__logo");
  const logoImage = fragment.querySelector(".plugin-card__logo-image");
  const fallback = fragment.querySelector(".plugin-card__logo-fallback");
  const title = fragment.querySelector(".plugin-card__title");
  const publisher = fragment.querySelector(".plugin-card__publisher");
  const description = fragment.querySelector(".plugin-card__description");
  const type = fragment.querySelector(".plugin-card__type");
  const tags = fragment.querySelector(".plugin-card__tags");
  const openLink = fragment.querySelector(".plugin-card__open");

  card.dataset.pluginId = plugin.id;
  card.dataset.categories = plugin.categories.join(",");
  card.dataset.type = plugin.type;
  card.dataset.openSource = String(plugin.openSource);
  card.dataset.featured = String(plugin.featured);

  title.textContent = plugin.title;
  publisher.textContent = `by ${plugin.publisher}`;
  description.textContent = plugin.description;
  type.textContent = plugin.type;

  fallback.textContent = plugin.initials || plugin.title.slice(0, 2);
  logoImage.src = plugin.logo;
  logoImage.alt = `${plugin.title} software logo`;

  logoImage.addEventListener("error", () => {
    logo.classList.add("is-fallback");
  }, { once: true });

  // Category tags, each with its matching icon.
  plugin.categories.forEach((category) => {
    const tag = document.createElement("span");
    tag.className = "plugin-card__tag";

    const icon = document.createElement("span");
    icon.className = "material-symbols-outlined";
    icon.setAttribute("aria-hidden", "true");
    icon.textContent = categoryIcons[category] || "extension";

    const label = document.createElement("span");
    label.textContent = category;

    tag.append(icon, label);
    tags.appendChild(tag);
  });

  openLink.href = plugin.url || "#";
  openLink.setAttribute("aria-label", `View ${plugin.title}`);

  return fragment;
}

function renderPlugins(items = plugins) {
  if (!pluginGrid || !pluginTemplate) return;

  const fragment = document.createDocumentFragment();

  items.forEach((plugin) => {
    fragment.appendChild(createPluginCard(plugin));
  });

  pluginGrid.replaceChildren(fragment);
}

renderPlugins();
