class Token{
    isValid(token){
        const payload = this.payload(token);
        if (payload) {                         //iss mane issu_date bojai
            return payload.iss == "http://automated-voting-system-back.test/api/auth/login"  || "http://automated-voting-system-back.test/api/voter" ? true: false
        }
        return false
    }

    payload(token){
        const payload = token.split('.')[1]  // (2nd value mean) the index after dot(.) of 3 parts of Token (www.jwt.io)
        return this.decode(payload)         //decode is just a variable/(function).
    }

    decode(payload){
        return JSON.parse(atob(payload))  //atob use for encode/decode
    }
}

export default Token = new Token()
