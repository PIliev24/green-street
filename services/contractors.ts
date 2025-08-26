import { ContractorRow } from "@/types/database";
import { Contractor, ContractorSchema } from "@/types/domain";
import { API_ENDPOINTS } from "@/utils/constants";
import { apiClient } from "./api-client";

function mapContractorToDomain(contractorRow: ContractorRow): Contractor {
  const result = ContractorSchema.safeParse({
    id: contractorRow.id,
    name: contractorRow.name,
    image: contractorRow.image,
    created_at: contractorRow.created_at,
  });

  if (!result.success) {
    console.error("Failed to validate contractor:", result.error);
    throw new Error("Invalid contractor data received from API");
  }

  return result.data;
}

export class ContractorsService {
  async getContractors(): Promise<Contractor[]> {
    const contractorRows = await apiClient.get<ContractorRow[]>(API_ENDPOINTS.CONTRACTORS.LIST);

    return contractorRows.map(mapContractorToDomain);
  }

  async searchContractors(query: string): Promise<Contractor[]> {
    const contractorRows = await apiClient.get<ContractorRow[]>(
      `${API_ENDPOINTS.CONTRACTORS.SEARCH}?q=${encodeURIComponent(query)}`
    );

    return contractorRows.map(mapContractorToDomain);
  }

  async getContractorById(id: string): Promise<Contractor> {
    const contractorRow = await apiClient.get<ContractorRow>(API_ENDPOINTS.CONTRACTORS.BY_ID(id));

    return mapContractorToDomain(contractorRow);
  }
}

export const contractorsService = new ContractorsService();
