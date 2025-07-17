import puppeteer from 'puppeteer';

const generateInvoice = async (order, type = 'a4') => {
  const html = `
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; margin: 0; padding: 20px; }
          .header { font-size: 24px; font-weight: bold; margin-bottom: 10px; }
          .info { margin-bottom: 10px; }
          table { width: 100%; border-collapse: collapse; margin-bottom: 10px; }
          th, td { border: 1px solid #ddd; padding: 8px; }
          th { background: #f4f4f4; }
          .total { font-weight: bold; }
        </style>
      </head>
      <body>
        <div class="header">Invoice</div>
        <div class="info">Order ID: ${order._id}</div>
        <div class="info">Customer: ${order.customerName} (${order.email})</div>
        <div class="info">Address: ${order.address}</div>
        <div class="info">Date: ${new Date(order.createdAt).toLocaleString()}</div>
        <table>
          <thead>
            <tr><th>Product</th><th>Price</th><th>Qty</th><th>Subtotal</th></tr>
          </thead>
          <tbody>
            ${order.items.map(item => `
              <tr>
                <td>${item.name}</td>
                <td>${item.price.toFixed(2)}</td>
                <td>${item.quantity}</td>
                <td>${(item.price * item.quantity).toFixed(2)}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
        <div class="total">Total: $${order.items.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2)}</div>
      </body>
    </html>
  `;

  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  await page.setContent(html, { waitUntil: 'networkidle0' });
  let pdfOptions;
  if (type === 'thermal') {
    pdfOptions = { width: '80mm', printBackground: true };
  } else {
    pdfOptions = { format: 'A4', printBackground: true };
  }
  const pdfBuffer = await page.pdf(pdfOptions);
  await browser.close();
  return pdfBuffer;
};

export default generateInvoice;
