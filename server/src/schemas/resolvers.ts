import User from '../models/User.js';
import { signToken } from '../services/auth.js';

const resolvers = {
  Query: {
    // This resolver returns the currently logged-in user's info.
    me: async (_: any, context: any) => {
      
      if (!context.user) {
        throw new Error("You need to be logged in!");
      }
     
      const foundUser = await User.findOne({ _id: context.user._id });
      if (!foundUser) {
        throw new Error("Cannot find a user with this id!");
      }
      return foundUser;
    },
  },

  Mutation: {
    login: async (_parent: any, { email, password }: { email: string; password: string }) => {
     
      const user = await User.findOne({ email });
      if (!user) {
        throw new Error("Can't find this user");
      }
      
      const correctPw = await user.isCorrectPassword(password);
      if (!correctPw) {
        throw new Error("Wrong password!");
      }
      
      const token = signToken(user.username, user.password, user._id);
      return { token, user };
    },

    // Creates a new user, signs a token for them, and returns both.
    addUser: async (_: any, { username, email, password }: { username: string; email: string; password: string }) => {
        // First we create the user in the database
      const user = await User.create({ username, email, password });
      if (!user) {
        throw new Error("Something is wrong!");
      }
      console.log('addedUser')
      // Sign a token for the new user.
      const token = signToken(user.username, user.password, user._id);
      return { token, user };
    },

    // Saves a book to the user's savedBooks array.
    saveBook: async (_parent: any, { bookData }: { bookData: any }, context: any) => {
      // If you're not logged in, you can't save a book – it's like trying to add a book to a library you don't belong to.
      if (!context.user) {
        throw new Error("You need to be logged in!");
      }
      try {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { savedBooks: bookData } }, // $addToSet prevents duplicates
          { new: true, runValidators: true }
        );
        return updatedUser;
      } catch (err) {
        console.error(err);
        throw new Error("Error saving book");
      }
    },

    // Removes a book from the user's savedBooks array.
    removeBook: async (_: any, { bookId }: { bookId: string }, context: any) => {
      // Again, if you're not logged in, no removal magic can happen.
      if (!context.user) {
        throw new Error("You need to be logged in!");
      }
      const updatedUser = await User.findOneAndUpdate(
        { _id: context.user._id },
        { $pull: { savedBooks: { bookId } } },
        { new: true }
      );
      if (!updatedUser) {
        throw new Error("Couldn't find user with this id!");
      }
      return updatedUser;
    },
  },
};

export default resolvers;