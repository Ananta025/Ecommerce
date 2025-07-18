import puppeteer from 'puppeteer';

const generateInvoice = async (order, type = 'a4') => {
  let html;
  if (type === 'thermal') {
    html = `
      <html>
        <head>
          <style>
            html, body { margin: 0; padding: 0; width: 100%; }
            body.thermal { width: 100%; max-width: 80mm; margin: 0; padding: 0; }
            .container { width: 100%; margin: 0; padding: 0; }
            .header { font-size: 16px; font-weight: bold; margin-bottom: 6px; }
            .info { margin-bottom: 4px; }
            table { width: 100%; border-collapse: collapse; margin-bottom: 6px; }
            th, td { border: 1px solid #ddd; padding: 4px; }
            th { background: #f4f4f4; font-size: 12px; }
            .total { font-weight: bold; font-size: 13px; margin-top: 8px; }
          </style>
        </head>
        <body class="thermal">
          <div class="container">
            <div class="header">Invoice</div>
            <div class="info">Order: ${order._id}</div>
            <div class="info">${order.customerName} (${order.email})</div>
            <div class="info">${order.address}</div>
            <div class="info">${new Date(order.createdAt).toLocaleString()}</div>
            <table>
              <thead>
                <tr><th>Product</th><th>₹</th><th>Qty</th><th>Sub</th></tr>
              </thead>
              <tbody>
                ${order.items.map(item => `
                  <tr>
                    <td>${item.name}</td>
                    <td>₹${item.price.toFixed(2)}</td>
                    <td>${item.quantity}</td>
                    <td>₹${(item.price * item.quantity).toFixed(2)}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
            <div class="total">Total: ₹${order.items.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2)}</div>
          </div>
        </body>
      </html>
    `;
  } else {
    html = `
      <html>
        <head>
          <style>
            html, body { margin: 0; padding: 0; width: 100%; }
            body.a4 { width: 100%; min-width: 210mm; min-height: 297mm; }
            .container { width: calc(100% - 40mm); margin: 0 auto; padding: 0; max-width: 170mm; }
            .header { font-size: 24px; font-weight: bold; margin-bottom: 10px; }
            .info { margin-bottom: 10px; }
            table { width: 100%; border-collapse: collapse; margin-bottom: 10px; }
            th, td { border: 1px solid #ddd; padding: 8px; }
            th { background: #f4f4f4; }
            .total { font-weight: bold; }
          </style>
        </head>
        <body class="a4">
          <div class="container">
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
                    <td>₹${item.price.toFixed(2)}</td>
                    <td>${item.quantity}</td>
                    <td>₹${(item.price * item.quantity).toFixed(2)}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
            <div class="total">Total: ₹${order.items.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2)}</div>
          </div>
        </body>
      </html>
    `;
  }

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  await page.setContent(html, { waitUntil: 'networkidle0' });
  let pdfOptions;
  if (type === 'thermal') {
    pdfOptions = { width: '80mm', margin: { top: 0, right: 0, bottom: 0, left: 0 }, printBackground: true };
  } else {
    pdfOptions = { format: 'A4', margin: { top: '20mm', right: '20mm', bottom: '20mm', left: '20mm' }, printBackground: true };
  }
  const pdfBuffer = await page.pdf(pdfOptions);
  await browser.close();
  return pdfBuffer;
};

export default generateInvoice;
