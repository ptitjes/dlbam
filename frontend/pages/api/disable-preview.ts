import { NextApiHandler } from "next"

const disablePreview: NextApiHandler = (req, res) => {
  res.clearPreviewData()
  res.end("Preview mode disabled")
}

export default disablePreview
