model Product {
    id           String           @id @default(uuid())
    title        String
    slug         String?          @unique
    description  String
    price        Float
    category     Category?       @relation(fields: [categoryId], references: [id])
    categoryId   String?
    subcategories SubCategory[]   @relation(references: [id])
    quantity     Int?
    sold         Int              @default(0)
    images       String[]
    shipping     String?         @enum(["Yes", "No"])
    color        String?         @enum(["Black", "Brown", "Silver", "White", "Blue"])
    brand        String?         @enum(["Apple", "Samsung", "Microsoft", "Lenovo", "ASUS"])
    ratings      Rating[]
    createdAt    DateTime        @default(now())
    updatedAt    DateTime        @updatedAt
  }
  
  model Category {
    id        String           @id @default(uuid())
    name      String           @unique
    parent    Category?        @relation("SubCategories", fields: [parentId], references: [id])
    parentId  String?
    children  Category[]       @relation("SubCategories")
    products  Product[]
    createdAt DateTime         @default(now())
    updatedAt DateTime         @updatedAt
  }
  
  model SubCategory {
    id        String           @id @default(uuid())
    name      String           @unique
    parent    Category         @relation(fields: [parentId], references: [id])
    parentId  String
    products  Product[]
    createdAt DateTime         @default(now())
    updatedAt DateTime         @updatedAt
  }
  
  model Rating {
    id        String    @id @default(uuid())
    star      Int
    postedBy  User      @relation(fields: [postedById], references: [id])
    postedById String
    product   Product   @relation(fields: [productId], references: [id])
    productId String
    createdAt DateTime  @default(now())
    updatedAt DateTime  @updatedAt
  }
  
  model User {
    id        String    @id @default(uuid())
    name      String
    email     String    @unique
    password  String
    role      UserRole  @default(USER)
    createdAt DateTime  @default(now())
    updatedAt DateTime  @updatedAt
  }
  
  enum UserRole {
    USER
    ADMIN
  }
  