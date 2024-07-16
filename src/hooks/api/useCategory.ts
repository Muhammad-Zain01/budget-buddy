const useCategory = () => {
  const getAllCategoryByUser = async (userId: string) => {
    return await prisma.category.findMany({
      where: {
        OR: [{ isPrimary: true }, { userId: userId }],
      },
      select: {
        id: true,
        isPrimary: true,
        categoryName: true,
        categoryType: true,
        icon: true,
        status: true,
      },
    });
  };

  return {
    getAllCategoryByUser,
  };
};

export default useCategory;
