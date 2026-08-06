const URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3000";

export interface Subject {
  subject: string;
}

export interface NotePreview {
  id: string;
  title: string;
  slug: string;
  updatedAt: string;
}

export interface Note {
  title: string;
  slug: string;
  subject: string;
  content: string;
}

export interface UpsertNoteDTO {
  slug: string;
  title: string;
  subject: string;
  content: string;
}

class ApiError extends Error {
  constructor(
    message: string,
    public readonly status: number,
  ) {
    super(message);
  }
}

async function request<T>(input: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${URL}${input}`, {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers ?? {}),
    },
    ...init,
  });

  if (!response.ok) {
    throw new ApiError(await response.text(), response.status);
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return response.json();
}

export const api = {
  notes: {
    bySubject(subject: string) {
      return request<NotePreview[]>(
        `/api/notes?subject=${encodeURIComponent(subject)}`,
      );
    },

    bySlug(slug: string) {
      return request<Note>(`/api/notes/${encodeURIComponent(slug)}`);
    },

    save(data: UpsertNoteDTO) {
      return request<void>("/api/notes", {
        method: "POST",
        body: JSON.stringify(data),
      });
    },

    delete(slug: string) {
      return request<void>(`/api/notes/${encodeURIComponent(slug)}`, {
        method: "DELETE",
      });
    },
  },

  subjects: {
    all() {
      return request<Subject[]>("/api/subjects");
    },

    create(subject: string) {
      return request<void>("/api/subjects", {
        method: "POST",
        body: JSON.stringify({
          subject,
        }),
      });
    },

    data(slug: string) {
      return request<{
        subject: Subject[];
        note: Note;
      }>(`/api/subjects/data?slug=${encodeURIComponent(slug)}`);
    },
  },
};
