import User from "../../DB/model/user.model";
import { hashPassword, comparePassword } from "../../common/utlis/hash";

export class UserService {
  constructor() {}

  getProfile = async (userId: string) => {
    const user = await User.findById(userId).select("-password");
    if (!user) {
      throw new Error("User not found!");
    }
    return {
      message: "Success",
      user,
    };
  };

  updateProfile = async (
    userId: string,
    data: { username?: string; phone?: string },
  ) => {
    const user = await User.findByIdAndUpdate(userId, data, {
      new: true,
    }).select("-password");
    if (!user) {
      throw new Error("User not found!");
    }
    return {
      message: "Profile updated successfully",
      user,
    };
  };

  changePassword = async (
    userId: string,
    data: { oldPassword: string; password: string },
  ) => {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error("User not found!");
    }

    const isMatch = await comparePassword(data.oldPassword, user.password);
    if (!isMatch) {
      throw new Error("Incorrect old password!");
    }

    const hashedNewPassword = await hashPassword(data.password);
    user.password = hashedNewPassword;
    await user.save();

    return {
      message: "Password changed successfully",
    };
  };

  toggleFollow = async (currentUserId: string, targetUserId: string) => {
    if (currentUserId === targetUserId) {
      throw new Error("You cannot follow yourself!");
    }
    const targetUser = await User.findById(targetUserId);
    if (!targetUser) {
      throw new Error("Target user not found!");
    }
    const currentUser = await User.findById(currentUserId);
    const isFollowing = currentUser?.following.includes(targetUserId as any);
    if (isFollowing) {
      await User.findByIdAndUpdate(currentUserId, {
        $pull: { following: targetUserId },
      });
      await User.findByIdAndUpdate(targetUserId, {
        $pull: { followers: currentUserId },
      });
      return { message: "Unfollowed successfully" };
    } else {
      await User.findByIdAndUpdate(currentUserId, {
        $push: { following: targetUserId },
      });
      await User.findByIdAndUpdate(targetUserId, {
        $push: { followers: currentUserId },
      });
      return { message: "Followed successfully" };
    }
  };

  searchUsers = async (keyword: string) => {
    const users = await User.find({
      username: { $regex: keyword, $options: "i" },
    }).select("username email profilePicture");

    return {
      message: "Success",
      results: users,
    };
  };

  getSuggestions = async (currentUserId: string) => {
    const currentUser = await User.findById(currentUserId);
    if (!currentUser) {
      throw new Error("User not found!");
    }
    const followingList = currentUser.following || [];
    const suggestions = await User.find({
      _id: { $nin: [...followingList, currentUserId] },
    })
      .select("username email profilePicture")
      .limit(5);
    return {
      message: "Success",
      suggestions,
    };
  };

  toggleAccountPrivacy = async (userId: string) => {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error("User not found!");
    }

    user.isPrivate = !user.isPrivate;
    await user.save();

    return {
      message: `Account privacy updated successfully. Profile is now ${user.isPrivate ? "Private" : "Public"}`,
      isPrivate: user.isPrivate,
    };
  };
}

export default new UserService();
