export interface IUser {
  user_id?: string;
  email: string;
  password: string;
  username: string;
  registration_date: Date;
  role: string;
  status: number;
  notification_id: string;
  name?: string;
  compareEncryptedPassword: (password: string) => boolean;
  getEncryptedPassword: (password: string) => string;
}

// user_id INT NOT NULL AUTO_INCREMENT,
// email NVARCHAR(150) NOT NULL,
// name NVARCHAR(200) NULL,
// username NVARCHAR(100) NOT NULL,
// registration_date DATETIME NOT NULL,
// password NVARCHAR(100) NOT NULL,
// role NVARCHAR(10) NOT NULL,
// status BIT NOT NULL,
// notification_id INT NOT NULL,
// PRIMARY KEY (user_id),
// UNIQUE (username, email)