export const Routes = {
	ADMIN: {
		SUBCATEGORY: {
			/** Output result: `/admin/subcategory/:slug/:categoryId` */
			createPath: (slug: string, categoryId: string) => `/admin/subcategory/${slug}/${categoryId}`
		},
	},
}
