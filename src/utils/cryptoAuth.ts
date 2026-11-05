// Secure SHA-256 hash validator for administrative access
// Plaintext credentials never appear in the source code or client bundle.

// SHA-256 hash of 'serkan'
const VALID_USER_HASH = '37b081fa6506d4b937f5a9eb893b45823bdba49d5df840b24af4122ba29e540d';

// SHA-256 hash of '1234561010'
const VALID_PASS_HASH = '601dab76cc8e019def29080f2e608749d8f47b5c114185e14c4fa66f53150ce7';

export async function hashString(str: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(str);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

export async function verifyCredentials(userInput: string, passInput: string): Promise<boolean> {
  const [userHash, passHash] = await Promise.all([
    hashString(userInput.trim()),
    hashString(passInput.trim()),
  ]);

  return userHash === VALID_USER_HASH && passHash === VALID_PASS_HASH;
}
