export default function StudentSignUp() {
  return (
    <div className="container background">
      <h1>Signup</h1>
      <form action="/signup" method="POST">
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" name="name" required />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" required />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" required />
        </div>
        <div className="form-group">
          <label htmlFor="role">Role:</label>
          <input type="text" id="role" name="role" value="student" readOnly />
        </div>
        <div className="form-group">
          <label htmlFor="courseEnrolled">Course Enrolled:</label>
          <input type="text" id="courseEnrolled" name="courseEnrolled" />
        </div>

        <button type="submit" className="btn btn-primary">
          Signup
        </button>
      </form>
      <p className="signin-link">
        Already have an account? <a href="signin.html">Sign in</a>
      </p>
    </div>
  );
}
