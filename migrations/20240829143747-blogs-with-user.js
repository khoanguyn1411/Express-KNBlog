const { ObjectId, Db, MongoClient } = require("mongodb");

module.exports = {
  /**
   * @param {Db} db
   * @param {MongoClient} client
   */
  async up(db, client) {
    const blogsCollection = db.collection("blogs");
    const usersCollection = db.collection("users");

    const blogs = await blogsCollection.find({}).toArray();

    for (const blog of blogs) {
      if (blog.writtenBy && ObjectId.isValid(blog.writtenBy)) {
        // Fetch the user data for the writtenBy field
        const user = await usersCollection.findOne({ _id: new ObjectId(blog.writtenBy) });

        if (user) {
          // Update the blog with the full writtenBy object
          await blogsCollection.updateOne(
            { _id: blog._id },
            {
              $set: {
                writtenBy: {
                  _id: user._id,
                  email: user.email,
                  firstName: user.firstName,
                  lastName: user.lastName,
                  lastLogin: user.lastLogin,
                  role: user.role,
                  pictureUrl: user.pictureUrl,
                },
              },
            },
          );
        } else {
          await blogsCollection.deleteOne({ _id: blog._id });
        }
      }
    }
  },

  async down(db, client) {
    // TODO write the statements to rollback your migration (if possible)
    // Example:
    // await db.collection('albums').updateOne({artist: 'The Beatles'}, {$set: {blacklisted: false}});
  },
};
