export async function pingCheck(req, res) {
  console.log("Received ping request");
  return res.status(200).json({ message: "pong" });
}
