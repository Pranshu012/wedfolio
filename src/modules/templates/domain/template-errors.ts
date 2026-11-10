export class TemplateVersionNotFoundError extends Error {
  constructor(templateId: string, version: string) {
    super(
      `Template "${templateId}" with version "${version}" is not registered in this deployment.`
    );
    this.name = 'TemplateVersionNotFoundError';
  }
}
