const API_URL = "https://react-fast-pizza-api.onrender.com/api";

export async function getMenu() {
  const res = await fetch(`${API_URL}/menu`);

  if (!res.ok) throw Error("Failed getting menu");

  const { data } = await res.json();
  return data;
}

export async function getOrder(id: number | string) {
  const res = await fetch(`${API_URL}/order/${id}`);
  if (!res.ok) throw Error(`Couldnt find order #${id}`);

  const { data } = await res.json();
  return data;
}

export async function createOrder(newOrder: object) {
  try {
    const res = await fetch(`${API_URL}/order`, {
      method: "POST",
      body: JSON.stringify(newOrder),
      headers: {
        "Content-Type": "appliction/json",
      },
    });
    if (!res.ok) throw Error();
    const { data } = await res.json();
    return data;
  } catch {
    throw Error("Failed Creating order");
  }
}

export async function updateOrder(id: number, updateObj: object) {
  try {
    const res = await fetch(`${API_URL}/order/${id}`, {
      method: "PATCH",
      body: JSON.stringify(updateObj),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) throw Error();
  } catch (error) {
    throw Error("Failed updating your order");
  }
}
