import { NextApiHandler } from "next"

const enablePreview: NextApiHandler = (req, res) => {
  res.setPreviewData({})
  res.end("Preview mode enabled")
}

export default enablePreview
