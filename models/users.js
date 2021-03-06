module.exports = (sequalize, DataTypes) => {
    let User = sequalize.define("User", {
       name: DataTypes.STRING,
       googleId: DataTypes.STRING,
       thumbNail:  DataTypes.STRING
    });

    return User;
};