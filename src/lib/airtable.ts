import Airtable from 'airtable';

// Initialize Airtable with environment variables
const base = new Airtable({
  apiKey: import.meta.env.VITE_AIRTABLE_API_KEY
}).base(import.meta.env.VITE_AIRTABLE_BASE_ID);

const TABLE_NAME = import.meta.env.VITE_AIRTABLE_TABLE_NAME;

// Helper function to convert file to base64
async function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsArrayBuffer(file);
    reader.onload = () => {
      const arrayBuffer = reader.result as ArrayBuffer;
      const bytes = new Uint8Array(arrayBuffer);
      let binary = '';
      for (let i = 0; i < bytes.byteLength; i++) {
        binary += String.fromCharCode(bytes[i]);
      }
      resolve(btoa(binary));
    };
    reader.onerror = () => reject(new Error(`Failed to read file: ${file.name}`));
  });
}

export async function addContact(
  name: string,
  email: string,
  phone: string,
  address: string,
  files: File[],
  metadata: {
    homeOwnership: string;
    electricityBill: string;
  }
) {
  try {
    // Convert files to base64 and format for Airtable
    const attachments = await Promise.all(
      files.map(async (file) => ({
        filename: file.name,
        type: file.type,
        base64: await fileToBase64(file)
      }))
    );

    // Create record with exact field mappings
    const record = await base(TABLE_NAME).create([
      {
        fields: {
          'Name': name.trim(),
          'Email': email.trim(),
          'Address': address.trim(),
          'Phone': phone.trim(),
          'Home Ownership': metadata.homeOwnership,
          'Monthly Bill': metadata.electricityBill,
          'PDF': attachments
        }
      }
    ]);

    if (!record?.[0]) {
      throw new Error('Failed to create record');
    }

    return record[0];
  } catch (error: any) {
    console.error('Airtable Error:', error);
    throw error;
  }
}