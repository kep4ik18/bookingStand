import {axiosInstance} from '../../../shared/api/axiosInstance';

interface TestRequest {
  name: string;
}

interface TestResponse {
  rackId: string;
}

export const testApi = async (data: TestRequest, token: string): Promise<TestResponse> => {
  try {
    const response = await axiosInstance.post<TestResponse>('/test', data, {
      headers: {
        Authorization: `Bearer ${token}`, // Передаём токен
      },
    });
    return response.data;
  } catch (error: any) {
    throw error.response?.data || { message: 'Unknown error' };
  }
};