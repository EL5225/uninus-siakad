import { z } from 'zod';

export const VSCreateUser = z.object({
  email: z
    .string()
    .email({
      message: 'Email tidak valid',
    })
    .nonempty({
      message: 'Email tidak boleh kosong',
    }),
  nik: z.string().nonempty({
    message: 'NIK tidak boleh kosong',
  }),
  fullname: z.string().nonempty({
    message: 'Nama lengkap tidak boleh kosong',
  }),
  password: z
    .string()
    .nonempty({
      message: 'Password tidak boleh kosong',
    })
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).*$/, {
      message:
        'Password harus memiliki setidaknya 6 karakter dan mengandung setidaknya 1 huruf kecil, 1 huruf besar, dan 1 angka. Tidak boleh mengandung simbol ',
    }),
});

export type TVSCreateUser = z.infer<typeof VSCreateUser>;
