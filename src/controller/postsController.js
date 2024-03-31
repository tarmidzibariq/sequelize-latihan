const { Posts, PostsCategories, Categories } = require("../models");

class postsController{
    titleToSlug = async (title) => {
        return title
            .trim() // Menghilangkan spasi di awal dan akhir string
            .replace(/\s+/g, '-') // Mengganti satu atau lebih spasi dengan tanda hubung
            .replace(/[^\w-]+/g, '') // Menghapus semua karakter selain huruf, angka, dan tanda hubung
            .replace(/--+/g, '-'); // Mengganti multiple tanda hubung dengan satu tanda hubung
    }
    store = async (req, res) => {
        try {
            const { title, description, categoryId, status } = req.body;
            const slug = await this.titleToSlug(title);

            const dataPosts = await Posts.create({
                title: title,
                description: description,
                status: status,
                slug :slug
            });
            const categoryIds = Array.isArray(categoryId) ? categoryId : [categoryId]
            for (let i = 0; i < categoryIds.length; i++) {
                await PostsCategories.create({
                    postId: dataPosts.id,
                    categoryId: categoryIds[i],
                });
            }
            
            // // Iterasi melalui semua categoryId dan membuat entri di PostsCategories
            // const postsCategoriesPromises = categoryIds.map(async (catId) => {
            //     return PostsCategories.create({
            //         postId: dataPosts.id,
            //         categoryId: catId,
            //     });
            // });

            // // Menunggu semua promises teresolve
            // await Promise.all(postsCategoriesPromises);

            return res.json({
                code: 201,
                message: "Data berhasil dibuat",
                dataPosts,
                // dataPostsCategories
            });
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    }
    index = async (req, res) => {
    try {
        const page = Number(req.query.page) || 1;
        const pageSize = Number(req.query.pageSize) || 3;
        const offset = (page - 1) * pageSize;

        const { count, rows } = await Posts.findAndCountAll({
            offset: offset,
            limit: pageSize,
            include: [{
                model: PostsCategories,
                as: 'categoryAssociations', // Make sure this alias matches the one used in your associations
                include: [{
                    model: Categories,
                    as: 'relatedPostsCategories', // This alias should match the one defined in your association
                }]
            }],
            distinct: true
        });

        // Using for loop to format the response
        const responseData = [];
        for (let i = 0; i < rows.length; i++) {
            const post = rows[i];
            const categoryData = [];
            for (let j = 0; j < post.categoryAssociations.length; j++) {
                const pc = post.categoryAssociations[j];
                categoryData.push({
                    id: pc.relatedPostsCategories.id,
                    title: pc.relatedPostsCategories.title,
                    createdAt: pc.relatedPostsCategories.createdAt,
                    updatedAt: pc.relatedPostsCategories.updatedAt,
                    deletedAt: pc.relatedPostsCategories.deletedAt,
                    PostCategories: {
                        id: pc.id,
                        postId: pc.postId,
                        categoryId: pc.categoryId,
                        createdAt: pc.createdAt,
                        updatedAt: pc.updatedAt,
                        deletedAt: pc.deletedAt
                    }
                });
            }
            responseData.push({
                id: post.id,
                title: post.title,
                description: post.description,
                thumbnail: post.thumbnail,
                status: post.status,
                slug: post.slug,
                createdAt: post.createdAt,
                updatedAt: post.updatedAt,
                deletedAt: post.deletedAt,
                Thumbnail: post.Thumbnail,
                Categories: categoryData
            });
        }

        return res.json({
            code: 200,
            message: `${count} Data Sudah Diterima`,
            count: count,
            page: page,
            pageSize: pageSize,
            data: responseData,
        });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}



}

module.exports = new postsController;