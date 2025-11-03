export interface ICompanyRepository {
  create(company: any): Promise<any>;
  findById(companyId: string): Promise<any>;
  updateServices(companyId: string, services: any[]): Promise<any>;
  delete(companyId: string): Promise<any>;
}
