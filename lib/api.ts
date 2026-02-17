
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "https://admin.masministries.org/api";

export async function apiRequest(endpoint: string, options: RequestInit = {}) {
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

    const headers = {
        "Content-Type": "application/json",
        Accept: "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...options.headers,
    };

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        ...options,
        headers,
    });

    if (!response.ok) {
        const error = await response.json().catch(() => ({}));
        throw new Error(error.message || "Something went wrong");
    }

    return response.json();
}

export const authApi = {
    login: (credentials: any) => apiRequest("/admin/login", {
        method: "POST",
        body: JSON.stringify(credentials),
    }),
    generateToken: (credentials: any) => apiRequest("/token/generate", {
        method: "POST",
        body: JSON.stringify(credentials),
    }),
    logout: async () => {
        try {
            await apiRequest("/admin/logout", { method: "POST" });
        } catch (error) {
            console.error("Logout failed", error);
        } finally {
            localStorage.removeItem("token");
            localStorage.removeItem("admin");
            window.location.href = "/sign-in";
        }
    },
};

export const dashboardApi = {
    getStatistics: () => apiRequest("/admin/dashboard/statistics", {
        method: "GET",
    }),
};

export const donationsApi = {
    getDonations: (page: number = 1) => apiRequest(`/admin/donations?page=${page}`, {
        method: "GET",
    }),
    getDonationById: (id: number | string) => apiRequest(`/admin/donations/${id}`, {
        method: "GET",
    }),
    updateDonation: (id: number | string, data: { payment_status: string; notes?: string }) => apiRequest(`/admin/donations/${id}`, {
        method: "PUT",
        body: JSON.stringify(data),
    }),
    deleteDonation: (id: number | string) => apiRequest(`/admin/donations/${id}`, {
        method: "DELETE",
    }),
    createDonation: (data: any) => apiRequest("/admin/donations", {
        method: "POST",
        body: JSON.stringify(data),
    }),
};

export const mastersApi = {
    getMasters: (page: number = 1) => apiRequest(`/admin/masters?page=${page}`, {
        method: "GET",
    }),
    createMaster: (data: { type: string; name: string; description?: string; is_active: boolean }) => apiRequest(`/admin/masters`, {
        method: "POST",
        body: JSON.stringify(data),
    }),
    getMasterById: (id: number | string) => apiRequest(`/admin/masters/${id}`, {
        method: "GET",
    }),
    updateMaster: (id: number | string, data: { type: string; name: string; description?: string; is_active: boolean }) => apiRequest(`/admin/masters/${id}`, {
        method: "PUT",
        body: JSON.stringify(data),
    }),
    deleteMaster: (id: number | string) => apiRequest(`/admin/masters/${id}`, {
        method: "DELETE",
    }),
};

export const purposesApi = {
    getPurposes: () => apiRequest("/admin/purposes", {
        method: "GET",
    }),
    getPurposeById: (id: number | string) => apiRequest(`/admin/purposes/${id}`, {
        method: "GET",
    }),
    createPurpose: (data: { name: string; description?: string; is_active: boolean }) => apiRequest("/admin/purposes", {
        method: "POST",
        body: JSON.stringify(data),
    }),
    updatePurpose: (id: number | string, data: { name: string; description?: string; is_active: boolean }) => apiRequest(`/admin/purposes/${id}`, {
        method: "PUT",
        body: JSON.stringify(data),
    }),
    deletePurpose: (id: number | string) => apiRequest(`/admin/purposes/${id}`, {
        method: "DELETE",
    }),
};

export const soldBooksApi = {
    getSoldBooks: (page: number = 1) => apiRequest(`/admin/sold-books?page=${page}`, {
        method: "GET",
    }),
    getSoldBookById: (id: number | string) => apiRequest(`/admin/sold-books/${id}`, {
        method: "GET",
    }),
    createSoldBook: (data: any) => apiRequest("/admin/sold-books", {
        method: "POST",
        body: JSON.stringify(data),
    }),
    updateSoldBook: (id: number | string, data: any) => apiRequest(`/admin/sold-books/${id}`, {
        method: "PUT",
        body: JSON.stringify(data),
    }),
    deleteSoldBook: (id: number | string) => apiRequest(`/admin/sold-books/${id}`, {
        method: "DELETE",
    }),
};

export const booksApi = {
    getBooks: (page: number = 1) => apiRequest(`/admin/books?page=${page}`, {
        method: "GET",
    }),
    createBook: (data: {
        title: string;
        author: string;
        isbn: string;
        description: string;
        cover_image?: string;
        published_date: string;
        publisher: string;
        price: number;
        currency: string;
        is_available: boolean;
    }) => apiRequest("/admin/books", {
        method: "POST",
        body: JSON.stringify(data),
    }),
    updateBook: (id: number | string, data: {
        title: string;
        author: string;
        isbn: string;
        description: string;
        cover_image?: string;
        published_date: string;
        publisher: string;
        price: number;
        currency: string;
        is_available: boolean;
    }) => apiRequest(`/admin/books/${id}`, {
        method: "PUT",
        body: JSON.stringify(data),
    }),
    deleteBook: (id: number | string) => apiRequest(`/admin/books/${id}`, {
        method: "DELETE",
    }),
};
export const galleriesApi = {
    getGalleries: (page: number = 1) => apiRequest(`/admin/gallery?page=${page}`, {
        method: "GET",
    }),
    createGallery: (data: {
        title: string;
        description: string;
        image_path: string;
        category: string;
        is_featured: boolean;
    }) => apiRequest("/admin/gallery", {
        method: "POST",
        body: JSON.stringify(data),
    }),
    updateGallery: (id: number | string, data: {
        title: string;
        description: string;
        image_path: string;
        category: string;
        is_featured: boolean;
    }) => apiRequest(`/admin/gallery/${id}`, {
        method: "PUT",
        body: JSON.stringify(data),
    }),
    deleteGallery: (id: number | string) => apiRequest(`/admin/gallery/${id}`, {
        method: "DELETE",
    }),
};
