package server

type HttpMethod int64

func (m HttpMethod) String() string {
	switch m {
	case GET:
		return "GET"
	case POST:
		return "POST"
	case PUT:
		return "PUT"
	case DELETE:
		return "DELETE"
	default:
		return "UNKNOWN"
	}
}

const (
	GET HttpMethod = iota
	POST
	PUT
	DELETE
)
