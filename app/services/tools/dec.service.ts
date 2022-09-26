import { Service } from 'typedi'
// import { Prisma } from '@prisma/client'

const crypto = require('crypto');
@Service()
export class decService {


    //这里是解密函数
    async decode(val): Promise<any> {
        /* @brief 解密数据*/
        let decodeParam = {
            algorithm: 'des-cbc',
            autoPadding: true,
            key: 'pjs_7#31',
            ciphertext: val,
            iv: 'pjs_7#31'
        }
        try {
            let ciphertext = decodeParam.ciphertext.toString();
            const decipher = crypto.createDecipheriv(decodeParam.algorithm, decodeParam.key, decodeParam.iv);
            decipher.setAutoPadding(decodeParam.autoPadding);  //default true
            let plaintext = decipher.update(ciphertext, 'base64', 'utf8');
            plaintext += decipher.final('utf8');
            // console.log("解密成功: algorithm(%s),plaintext(%s),ciphertext(%s)",
            //   decodeParam.algorithm, plaintext, ciphertext);
            return plaintext;
        } catch (err) {
            console.log("decrypto data failed: " + err);
            return null;
        }
    }


    //这里是加密函数
    async encode(val): Promise<any> {


        /* @brief 解密数据*/
        let encodeParam = {
            algorithm: 'des-cbc',
            autoPadding: true,
            key: 'pjs_7#31',
            plaintext: val,
            iv: 'pjs_7#31'
        }
        try {
            let plain = encodeParam.plaintext.toString();
            const cipher = crypto.createCipheriv(encodeParam.algorithm, encodeParam.key, encodeParam.iv);
            cipher.setAutoPadding(encodeParam.autoPadding)  //default true
            let ciphertext = cipher.update(plain, 'utf8', 'base64');
            ciphertext += cipher.final('base64');
            // console.log("加密成功: algorithm(%s),plaintext(%s),ciphertext(%s)",
            //   encodeParam.algorithm, plain, ciphertext);
            return ciphertext;
        } catch (err) {
            console.log("crypto data failed: " + err);
            return null;
        }

    }


    /**
     * Type 'Prisma.SessionCreateInput' is automatically generated.
     * Whenever you modify file 'prisma/schema.prisma' and then run command:
     *   prisma generate
     *   prisma migrate dev
     * The types is automatically updated.
     *
     * About CRUD: https://www.prisma.io/docs/concepts/components/prisma-client/crud
     */
    // async create(session: Prisma.SessionCreateInput) {
    //   return prisma.session.create({
    //     data: session,
    //   })
    // }
}
