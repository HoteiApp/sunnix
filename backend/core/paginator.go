package core

import (
	"fmt"
	"math"
	"reflect"
	"strconv"

	"github.com/HoteiApp/sunnix/backend/models"
	"github.com/gofiber/fiber/v2"
	"gorm.io/gorm"
)

func Paginate(query *gorm.DB, itemsPtr interface{}, ctx *fiber.Ctx) (models.Pagination, error) {
	var pagination models.Pagination

	limit, err := strconv.Atoi(ctx.Query("limit", "10"))
	if err != nil {
		return pagination, err
	}
	page, err := strconv.Atoi(ctx.Query("page", "1"))
	if err != nil {
		return pagination, err
	}
	sort := ctx.Query("sort", "")

	var count int64
	// if err := query.Count(&count).Error; err != nil {
	// 	return pagination, err
	// }

	totalPages := int(math.Ceil(float64(count) / float64(limit)))

	offset := (page - 1) * limit
	if offset < 0 {
		offset = 0
	}
	if err := query.Offset(offset).Limit(limit).Order(sort).Find(itemsPtr).Error; err != nil {
		return pagination, err
	}

	baseUrl := ctx.Path()
	if page > 1 {
		prevPage := page - 1
		prevUrl := fmt.Sprintf("%s?page=%d&limit=%d&sort=%s", baseUrl, prevPage, limit, sort)
		pagination.PrevURL = prevUrl
	}

	if page < totalPages {
		nextPage := page + 1
		nextUrl := fmt.Sprintf("%s?page=%d&limit=%d&sort=%s", baseUrl, nextPage, limit, sort)
		pagination.NextURL = nextUrl
	}

	pagination.Limit = limit
	pagination.Page = page
	pagination.Sort = sort
	pagination.TotalItems = count
	pagination.TotalPages = totalPages
	pagination.HasPrev = page > 1
	pagination.HasNext = page < totalPages
	pagination.Items = itemsPtr

	return pagination, nil
}

func PaginateStruct(slice interface{}, ctx *fiber.Ctx) (models.Pagination, error) {
	var pagination models.Pagination

	limit, err := strconv.Atoi(ctx.Query("limit", "10"))
	if err != nil {
		return pagination, err
	}
	page, err := strconv.Atoi(ctx.Query("page", "1"))
	if err != nil {
		return pagination, err
	}
	sort := ctx.Query("sort", "")

	// Use reflection to handle slices of any struct type
	sliceValue := reflect.ValueOf(slice)
	if sliceValue.Kind() != reflect.Slice {
		return pagination, fmt.Errorf("expected a slice, got %s", sliceValue.Kind())
	}

	totalItems := sliceValue.Len()
	totalPages := int(math.Ceil(float64(totalItems) / float64(limit)))

	offset := (page - 1) * limit
	if offset < 0 {
		offset = 0
	}

	end := offset + limit
	if end > totalItems {
		end = totalItems
	}

	// Extract the paginated items
	paginatedItems := sliceValue.Slice(offset, end).Interface()

	baseUrl := ctx.Path()
	if page > 1 {
		prevPage := page - 1
		prevUrl := fmt.Sprintf("%s?page=%d&limit=%d&sort=%s", baseUrl, prevPage, limit, sort)
		pagination.PrevURL = prevUrl
	}

	if page < totalPages {
		nextPage := page + 1
		nextUrl := fmt.Sprintf("%s?page=%d&limit=%d&sort=%s", baseUrl, nextPage, limit, sort)
		pagination.NextURL = nextUrl
	}

	pagination.Limit = limit
	pagination.Page = page
	pagination.Sort = sort
	pagination.TotalItems = int64(totalItems)
	pagination.TotalPages = totalPages
	pagination.HasPrev = page > 1
	pagination.HasNext = page < totalPages
	pagination.Items = paginatedItems

	return pagination, nil
}
