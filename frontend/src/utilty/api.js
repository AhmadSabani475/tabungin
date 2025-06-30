const api = (() => {
  const BASE_URL = "http://localhost:8081/api";
  function getAccessToken() {
    return localStorage.getItem("accessToken");
  }

  function putAccessToken(accessToken) {
    return localStorage.setItem("accessToken", accessToken);
  }
  async function fetchWithToken(url, options = {}) {
    return fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        Authorization: `Bearer ${getAccessToken()}`,
      },
    });
  }
  async function register({ name, email, password }) {
    const response = await fetch(`${BASE_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });
    const responseJson = await response.json();
    if (responseJson.status !== "success") {
      alert(responseJson.message);
      return {
        error: true,
      };
    }
    return { error: false };
  }
  async function login({ email, password }) {
    const response = await fetch(`${BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    const responseJson = await response.json();
    if (responseJson.status !== "success") {
      alert(responseJson.message);
      return {
        error: true,
        data: null,
      };
    }
    return { error: false, data: responseJson.data };
  }
  async function getAllGoals() {
    const response = await fetch(`${BASE_URL}/goals`, {
      headers: { Authorization: `Bearer ${getAccessToken()}` },
    });
    const responseJson = await response.json();
    if (responseJson.status !== "success") {
      return { error: true, data: null };
    }
    return { error: false, data: responseJson.data };
  }
  async function createGoal({
    namaTabungan,
    target,
    nominalRutin,
    frekuensi,
    hari,
    mataUang,
    tanggalDibuat,
  }) {
    const response = await fetch(`${BASE_URL}/goals`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        namaTabungan,
        target,
        nominalRutin,
        frekuensi,
        hari,
        mataUang,
        tanggalDibuat,
      }),
    });
    const responseJson = await response.json();
    if (responseJson.status !== "success") {
      return {
        error: true,
        data: null,
      };
    }
    return {
      error: false,
      data: responseJson.data,
    };
  }
  async function getDetailGoal(id) {
    const response = await fetch(`${BASE_URL}/goals/${id}`, {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    });
    const responseJson = await response.json();
    if (responseJson.status !== "success") {
      return {
        error: true,
        data: null,
      };
    }
    return {
      error: false,
      data: responseJson.data,
    };
  }
  async function deleteGoal(id) {
    const response = await fetch(`${BASE_URL}/goals/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${getAccessToken()}` },
    });
    const responseJson = await response.json();
    if (responseJson.status !== "success") {
      return {
        error: true,
      };
    }
    return {
      error: false,
      data: responseJson.data,
    };
  }
  async function getEntries(goalId) {
    try {
      const response = await fetch(`${BASE_URL}/goals/${goalId}/entries`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
        },
      });
      const responseJson = await response.json();

      if (responseJson.status !== "success") {
        return { error: true, data: null };
      }

      return {
        error: false,
        data: responseJson.data, // kamu bisa langsung ambil entries
      };
    } catch (err) {
      return { error: true, data: null, message: err.message };
    }
  }

  async function createEntry(goalId, nominal) {
    try {
      const response = await fetch(`${BASE_URL}/goals/${goalId}/entries`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nominal }),
      });

      const responseJson = await response.json();

      if (responseJson.status !== "success") {
        return { error: true, data: null };
      }

      return {
        error: false,
        data: responseJson.data,
      };
    } catch (err) {
      return { error: true, data: null, message: err.message };
    }
  }
  async function getProfile() {
    try {
      const response = await fetch(`${BASE_URL}/users/me`, {
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
        },
      });

      const responseJson = await response.json();
      if (responseJson.status !== "success") {
        return { error: true, data: null };
      }

      return { error: false, data: responseJson.data };
    } catch (err) {
      return { error: true, message: err.message };
    }
  }

  return {
    getAccessToken,
    putAccessToken,
    fetchWithToken,
    register,
    login,
    getAllGoals,
    createGoal,
    getDetailGoal,
    deleteGoal,
    getEntries,
    createEntry,
    getProfile,
  };
})();
export { api };
