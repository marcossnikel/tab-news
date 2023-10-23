function status(request, response) {
  response.status(200).json({ key: 'the best' })
}

export default status
