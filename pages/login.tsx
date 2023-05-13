import Cookies from "js-cookie";
import Link from "next/link";
import { FormEvent, useState } from "react";

export default function Login() {
  let [email, setEmail] = useState<string>('');
  let [password, setPassword] = useState<string>('');
   // * loading state untuk menampilkan loading ketika login
  let [loading, setLoading] = useState<boolean>(false);
  let [error, setError] = useState<string>('');
  function login(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // * menampilkan loading ketika login
    setLoading(true);
    // * menghapus error sebelumnya jika sudah ada
    setError('');
    // * validasi email dan password jika kosong
    if (!email || !password) {
     return setError('Email dan password tidak boleh kosong');
    }
    // * validasi email jika tidak sesuai format menggunakan metode regex
    if (!email.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/)) {
      return setError('Email tidak valid');
    }
    // * melakukan login
    fetch('http://localhost:3001/v1/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    }).then(res => res.json()).then(data => {
        setLoading(false);
        if(data.status !== 200) {
          setError('Email atau password salah');
        }

        // * jika berhasil login maka akan diarahkan ke halaman home dan menyimpan token di cookies
        Cookies.set('token', data.token, { expires: 1 });
        window.location.href = '/';
    }).catch(err => {
      setLoading(false);
      setError('Internal server bermasalah, silahkan hubungin management');
    });
  }
  return (
    <main className="bg-blue-400 min-h-full h-[100vh] p-2 flex items-center justify-center">
      <div className="bg-white px-6 py-5 max-w-md md:max-w-sm w-full">
        <h1 className="text-2xl font-extrabold tracking-wide text-emerald-400 font-[Poppins]">Boring Message</h1>
        <p className="text-sm text-gray-500 mt-2 font-mono">Masuk ke akun Borsag untuk menggunakan aplikasi</p>

        {/* * menampilkan error jika ada */}
        {error && <div className="bg-red-500 mt-2 px-2 font-mono text-sm text-white py-1.5">
          <p>{error}</p>
          </div>}
        <form onSubmit={login}>
          <div className="flex flex-col gap-1 mt-4">
            <label htmlFor="email" className="text-sm font-semibold font-mono">Email</label>
            <input value={email} onChange={(e) => setEmail(e.target.value)} autoFocus required className="border font-mono outline-none px-3 focus:border-blue-400 py-1.5 text-sm" placeholder="Email kamu" type="email" name="email" id="email" />
          </div>
          <div className="flex flex-col gap-1 mt-4">
            <label htmlFor="password" className="text-sm font-mono font-semibold">Password</label>
            <input value={password} onChange={(e) => setPassword(e.target.value)} autoFocus required className="border font-mono outline-none px-3 focus:border-blue-400 py-1.5 text-sm" placeholder="********" type="password" name="password" id="password" />
          </div>
          <div className="mt-4 flex justify-between">
            <button disabled={loading} className="disabled:bg-blue-300 text-sm px-5 py-1.5 bg-blue-500 text-white font-mono">
              {loading ? 'Loading...' : 'Masuk'}
            </button>
            <div>
              <Link className="font-mono text-sm text-blue-500" href="/register">
                Belum punya akun?
              </Link>
            </div>
          </div>
        </form>
      </div>
    </main>
  )
}

export function getServerSideProps(ctx: any) {
  // * get cookies token
  const { token } = ctx.req.cookies;
  // * redirect user to home page if token is found
  if (token) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }
  return {
    props: {
    }
  }
}