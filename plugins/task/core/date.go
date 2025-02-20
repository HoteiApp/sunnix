package core

import (
	"regexp"
	"strconv"
	"time"
)

// ParseDurationString parse a string like "1d2h20m10s" and return a time.Duration
func ParseDurationString(durationStr string) (time.Duration, error) {
	var totalDuration time.Duration

	re := regexp.MustCompile(`(\d+d)?(\d+h)?(\d+m)?(\d+s)?`)
	matches := re.FindStringSubmatch(durationStr)

	for _, match := range matches[1:] {
		if match == "" {
			continue
		}
		value := match[:len(match)-1]
		unit := match[len(match)-1]
		n, err := strconv.Atoi(value)
		if err != nil {
			return 0, err
		}

		switch unit {
		case 'd':
			totalDuration += time.Duration(n) * 24 * time.Hour
		case 'h':
			totalDuration += time.Duration(n) * time.Hour
		case 'm':
			totalDuration += time.Duration(n) * time.Minute
		case 's':
			totalDuration += time.Duration(n) * time.Second
		}
	}

	return totalDuration, nil
}
