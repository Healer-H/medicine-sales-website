const request = require('supertest')
const app = require('../../src/server')

const loginRoute = '/user/login'
const emailValid = '22520491@gm.uit.edu.vn'
const passwordValid = 'password123'
const emailInValid1 = '2252049@gm.uit.edu.vn'
const passwordInValid = 'password'
const emailInValid2 = '22520491gm.uit.edu.vn'

describe(`POST ${loginRoute}`, function() {  // Mô tả nhóm test cho API đăng nhập
    it('TC01 - Đăng nhập với thông tin chính xác', function(done) {
        request(app)
          .post(loginRoute)
          .send({ email: emailValid, password: passwordValid }) // Gửi yêu cầu
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200) // Kiểm tra trạng thái HTTP trả về có là 200 không
          .expect((res) => {
              if (!('access_token' in res.body)) throw new Error("Thiếu token trong phản hồi");
          })
          .end(done); // Kết thúc test
    });
    it('TC02 - Đăng nhập với thông tin sai', function(done) {
        request(app)
          .post(loginRoute)
          .send({ email: emailInValid1, password: passwordValid }) // Gửi tên tài khoản sai
          .expect(401) // Kiểm tra trạng thái HTTP 401 (Unauthorized)
          .expect((res) => {
              if (!('error' in res.body)) throw new Error("Thiếu thông báo lỗi");
              if (res.body.error !== 'Tài khoản không tồn tại.') throw new Error("Thông báo lỗi sai");
          })
          .end(done); // Kết thúc test
    });
    it('TC03 - Đăng nhập với thông tin sai', function(done) {
        request(app)
          .post(loginRoute)
          .send({ email: emailValid, password: passwordInValid }) // Gửi mật khẩu sai
          .expect(401) // Kiểm tra trạng thái HTTP 401 (Unauthorized)
          .expect((res) => {
              if (!('error' in res.body)) throw new Error("Thiếu thông báo lỗi");
              if (res.body.error !== 'Email hoặc mật khẩu không đúng.') throw new Error("Thông báo lỗi sai");
          })
          .end(done); // Kết thúc test
    });
    it('TC04 - Đăng nhập với thông tin sai', function(done) {
        request(app)
          .post(loginRoute)
          .send({
            email : emailInValid1, password: passwordInValid}) // Tên tài khoản sai, mật khẩu sai
          .expect(401) // Kiểm tra trạng thái HTTP 401 (Unauthorized)
          .expect((res) => {
            if (!('error' in res.body)) throw new Error("Thiếu thông báo lỗi");
              if (res.body.error !== 'Tài khoản không tồn tại.') throw new Error("Thông báo lỗi sai");
          })
          .end(done); // Kết thúc test
    });
    it('TC05 - Đăng nhập với tên tài khoản hoặc mật khẩu để trống', function(done) {
        request(app)
          .post(loginRoute)
          .send({
            email: '',   // Tên tài khoản để trống
            password: ''    // Mật khẩu để trống
          })
          .expect(400)  // Lỗi vì thiếu thông tin bắt buộc
          .expect(res => {
            if (!('errors' in res.body)) throw new Error("Thiếu thông báo lỗi");
              if (res.body.errors[0].msg !== 'Email không hợp lệ') throw new Error("Thông báo lỗi sai");
            })
          .end(done); // Kết thúc test
    });
    it('TC06 - Đăng nhập với tên tài khoản không đúng cú pháp', function(done) {
        request(app)
          .post(loginRoute)
          .send({
            email: emailInValid2,  // Tên tài khoản không phải email
            password: passwordValid
          })
          .expect(400)  // Định dạng không hợp lệ
          .expect(res => {
            if (!('errors' in res.body)) throw new Error("Thiếu thông báo lỗi");
              if (res.body.errors[0].msg !== 'Email không hợp lệ') throw new Error("Thông báo lỗi sai");
          })
          .end(done);
      });
      it('TC07 - Đăng nhập với SQL Injection', function(done) {
        request(app)
          .post(loginRoute)
          .send({
            email: "' OR '1'='1';--",  // Chuỗi SQL Injection
            password: passwordInValid
          })
          .expect(400)  // Không cho phép đăng nhập
          .expect(res => {
            if (!('errors' in res.body)) throw new Error("Thiếu thông báo lỗi");
              if (res.body.errors[0].msg !== 'Email không hợp lệ') throw new Error("Thông báo lỗi sai");
          })
          .end(done);
      });
});