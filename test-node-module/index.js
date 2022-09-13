import * as IPFS from 'ipfs-core'
import all from 'it-all'
import { concat as uint8ArrayConcat } from 'uint8arrays/concat'
import { fromString as uint8ArrayFromString } from 'uint8arrays/from-string'
import { toString as uint8ArrayToString } from 'uint8arrays/to-string'

async function test_node() {
  // Create ipfs_node
  const ipfs_node = await IPFS.create()

  // Log version
  const version = await ipfs_node.version()
  console.log('Version:', version.version)

  // Add file with ipfs add
  const file = await ipfs_node.add({
    path: 'hello_world.txt',
    content: uint8ArrayFromString('Hello World!')
  })
  console.log('Added file:', file.path, "with cid:", file.cid.toString())

  // Read file with ipfs cat
  const data = uint8ArrayConcat(await all(ipfs_node.cat(file.cid)))
  console.log('File contents:', uint8ArrayToString(data))
}

async function get_cid(cid) {
  const dir = await all(ipfs_node.get(cid))

  console.log("Contents in directory:")
  console.log(dir)
}

test_node()
