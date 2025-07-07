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
    gambar,
  }) {
    try {
      const formData = new FormData();
      formData.append("namaTabungan", namaTabungan);
      formData.append("target", target.toString());
      formData.append("nominalRutin", nominalRutin.toString());
      formData.append("frekuensi", frekuensi);

      // Handle hari (array atau string)
      if (Array.isArray(hari)) {
        formData.append("hari", hari.join(","));
      } else {
        formData.append("hari", hari || "");
      }

      formData.append("mataUang", mataUang);
      formData.append("tanggalDibuat", tanggalDibuat);

      // Handle file upload
      if (gambar) {
        if (!gambar.type.startsWith("image/")) {
          return { error: true, message: "File harus berupa gambar" };
        }
        if (gambar.size > 2 * 1024 * 1024) {
          return { error: true, message: "Ukuran gambar maksimal 2MB" };
        }
        formData.append("gambar", gambar);
      }

      const response = await fetch(`${BASE_URL}/goals`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
        },
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Gagal membuat tabungan");
      }

      const responseJson = await response.json();
      return {
        error: false,
        data: responseJson.data,
        message: "Tabungan berhasil dibuat",
      };
    } catch (error) {
      console.error("Create goal error:", error);
      return {
        error: true,
        message: error.message || "Terjadi kesalahan saat membuat tabungan",
        data: null,
      };
    }
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

  //
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
  async function addEntry(
    goalId,
    { nominal, keterangan, tanggal, jenisTransaksi }
  ) {
    try {
      const response = await fetch(`${BASE_URL}/goals/${goalId}/entries`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getAccessToken()}`,
        },
        body: JSON.stringify({
          nominal: Number(nominal),
          keterangan: keterangan || "",
          tanggal: tanggal || new Date().toISOString().split("T")[0],
          jenisTransaksi: jenisTransaksi,
        }),
      });

      const responseJson = await response.json();

      if (!response.ok) {
        throw new Error(responseJson.message || "Gagal menambahkan entri");
      }

      return {
        error: false,
        data: responseJson.data.entry,
        message: responseJson.message,
      };
    } catch (error) {
      console.error("Error adding entry:", error);
      return {
        error: true,
        message: error.message,
        data: null,
      };
    }
  }
  async function editGoal(
    id,
    {
      namaTabungan,
      target,
      nominalRutin,
      frekuensi,
      hari,
      mataUang,
      tanggalDibuat,
      gambar,
    }
  ) {
    try {
      const formData = new FormData();
      formData.append("namaTabungan", namaTabungan);
      formData.append("target", target.toString());
      formData.append("nominalRutin", nominalRutin.toString());
      formData.append("frekuensi", frekuensi);

      if (Array.isArray(hari)) {
        formData.append("hari", hari.join(","));
      } else {
        formData.append("hari", hari || "");
      }

      formData.append("mataUang", mataUang);
      formData.append("tanggalDibuat", tanggalDibuat);

      // Handle file jika diberikan
      console.log("gambar:", gambar);
      if (gambar?.type) {
        if (!gambar.type.startsWith("image/")) {
          return { error: true, message: "File harus berupa gambar" };
        }

        if (gambar.size > 2 * 1024 * 1024) {
          return { error: true, message: "Ukuran gambar maksimal 2MB" };
        }

        formData.append("gambar", gambar);
      }

      const response = await fetch(`${BASE_URL}/goals/${id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
        },
        body: formData,
      });

      const responseJson = await response.json();

      if (!response.ok) {
        throw new Error(responseJson.message || "Gagal mengedit tabungan");
      }

      return {
        error: false,
        data: responseJson.data,
        message: responseJson.message || "Tabungan berhasil diedit",
      };
    } catch (error) {
      console.error("Edit goal error:", error);
      return {
        error: true,
        message: error.message,
        data: null,
      };
    }
  }

  return {
    getAccessToken,
    putAccessToken,
    fetchWithToken,
    register,
    editGoal,
    login,
    getAllGoals,
    createGoal,
    getDetailGoal,
    deleteGoal,
    getEntries,

    getProfile,
    addEntry,
  };
})();
export { api };
