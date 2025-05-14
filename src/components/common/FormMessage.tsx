export type Message =
  | { success: string }
  | { error: string }
  | { message: string };

export function FormMessage({ message }: { message: Message }) {
  return (
    <div>
      {"success" in message && (
        <div >
          {message.success}
        </div>
      )}
      {"error" in message && (
        <div >
          {message.error}
        </div>
      )}
      {"message" in message && (
        <div >{message.message}</div>
      )}
    </div>
  );
}
