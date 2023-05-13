package info

func GetIdentity(isServer bool) string {
	if isServer {
		return "[Server]"
	} else {
		return "[Client]"
	}
}
