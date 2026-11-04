import AsyncStorage from "@react-native-async-storage/async-storage";
import { Occurrence, User } from "../types";
import { MOCK_OCCURRENCES, MOCK_USERS } from "../data/mockData";

const OCCURRENCES_KEY = "@nuclear_sentinel_occurrences";
const USER_SESSION_KEY = "@nuclear_sentinel_session";

export const getOccurrences = async (): Promise<Occurrence[]> => {
  try {
    const data = await AsyncStorage.getItem(OCCURRENCES_KEY);
    if (!data) {
      await AsyncStorage.setItem(
        OCCURRENCES_KEY,
        JSON.stringify(MOCK_OCCURRENCES),
      );
      return MOCK_OCCURRENCES;
    }
    return JSON.parse(data);
  } catch (error) {
    console.error("Erro ao buscar ocorrências:", error);
    return MOCK_OCCURRENCES;
  }
};

export const saveOccurrence = async (
  newOccurrence: Omit<Occurrence, "id" | "createdAt">,
): Promise<Occurrence[]> => {
  try {
    const currentOccurrences = await getOccurrences();
    const occurrence: Occurrence = {
      ...newOccurrence,
      id: String(Date.now()),
      createdAt: new Date().toISOString(),
    };

    const updated = [occurrence, ...currentOccurrences];
    await AsyncStorage.setItem(OCCURRENCES_KEY, JSON.stringify(updated));
    return updated;
  } catch (error) {
    console.error("Erro ao salvar ocorrência:", error);
    throw error;
  }
};


export const updateOccurrenceStatus = async (
  id: string,
  newStatus: string,
): Promise<Occurrence[]> => {
  try {
    const currentOccurrences = await getOccurrences();

    const updated = currentOccurrences.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          status: newStatus as any,
        };
      }
      return item;
    });

    await AsyncStorage.setItem(OCCURRENCES_KEY, JSON.stringify(updated));
    return updated;
  } catch (error) {
    console.error("Erro ao atualizar status da ocorrência:", error);
    throw error;
  }
};

export const authenticateUser = async (
  email: string,
  senha: string,
): Promise<User | null> => {
  const foundUser = MOCK_USERS.find(
    (u) => u.email.toLowerCase() === email.toLowerCase(),
  );

  if (foundUser && foundUser.senha === senha) {
    await AsyncStorage.setItem(USER_SESSION_KEY, JSON.stringify(foundUser));
    return foundUser;
  }

  return null;
};

export const getSession = async (): Promise<User | null> => {
  try {
    const data = await AsyncStorage.getItem(USER_SESSION_KEY);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error("Erro ao buscar sessão:", error);
    return null;
  }
};

export const clearSession = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem(USER_SESSION_KEY);
  } catch (error) {
    console.error("Erro ao limpar sessão:", error);
  }
};
